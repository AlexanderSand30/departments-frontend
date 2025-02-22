import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface DataType {
    key: React.Key;
    division: string;
    upperDivision: string;
    collaborator: number;
    level: number;
    subdivisions: number;
    ambassador: string;
}

interface FilterDivisionType {
    text: string,
    value: string,
}

const DepartmentTable = () => {

    const API_URL = import.meta.env.VITE_API_URL + '/department';
    const [data, setData] = useState<DataType[]>([]);
    const [filterDivision, setFilterDivision] = useState<FilterDivisionType[]>([]);
    const [loading, setLoading] = useState(true);

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Division',
            dataIndex: 'division',
            sorter: (a, b) => a.division.localeCompare(b.division),
            filters: filterDivision,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.division.includes(value as string),
        },
        {
            title: 'División Superior',
            dataIndex: 'upperDivision',
            sorter: (a, b) => a.upperDivision.localeCompare(b.upperDivision),
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.upperDivision.includes(value as string),
        },
        {
            title: 'Colaboradores',
            dataIndex: 'collaborator',
            sorter: (a, b) => a.collaborator - b.collaborator,
        },
        {
            title: 'Nivel',
            dataIndex: 'level',
            sorter: (a, b) => a.level - b.level,
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.level === value,
        },
        {
            title: 'Subdivisiones',
            dataIndex: 'subdivisions',
            sorter: (a, b) => a.subdivisions - b.subdivisions,
            render: (value) => (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    {value}
                    <span style={{ color: "#fff", backgroundColor: "#52c41a", marginLeft: 15, borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PlusOutlined style={{ fontSize: '10px', fontWeight: 'bold' }} />
                    </span>
                </span>
            ),
        },
        {
            title: 'Embajadores',
            dataIndex: 'ambassador',
        },
    ];

    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => {
                if (!response.ok) throw new Error("Error en la respuesta");
                return response.json();
            })
            .then((data) => {
                setData(data.data);
                const uniqueDivisions = Array.from(new Set(data.data.map((item: DataType) => item.division)))
                    .map(division => ({ text: division as string, value: division as string }));
                setFilterDivision(uniqueDivisions)
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error) return <p>Error: {error}</p>;

    return (
        <Table<DataType>
            size="middle"
            rowSelection={{ type: undefined, ...[] }}
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50"],
                defaultPageSize: 10,
                total: data.length,
                showTotal: (total) => `Total colaboradores: ${total}`,
            }}
        />
    )
};

export default DepartmentTable;