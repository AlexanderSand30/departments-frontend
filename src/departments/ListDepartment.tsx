import { Flex, Input, Radio, Select, Tooltip } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useState } from 'react';
import DepartmentTable from './DepartmentTable';
import { SearchOutlined } from '@ant-design/icons';

function ListDepartment() {
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
    return (
        <div>
            <Flex justify='space-between' style={{ paddingBottom: '12px' }}>
                <div>
                    <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
                        <Radio.Button value="large">Listado</Radio.Button>
                        <Radio.Button value="small">Árbol</Radio.Button>
                    </Radio.Group>
                </div>
                <Flex gap={8}>
                    <Select
                        showSearch
                        style={{ width: 250 }}
                        placeholder="Columnas"
                        optionFilterProp="label"
                        options={[]}
                    />
                    <Input
                        placeholder="Search"
                        style={{ width: 250 }}
                        suffix={
                            <Tooltip title="Extra information">
                                <SearchOutlined style={{ color: 'rgba(107, 104, 104, 0.45)' }} />
                            </Tooltip>
                        }
                    />
                </Flex>
            </Flex>

            <DepartmentTable />

        </div>
    )
}

export default ListDepartment