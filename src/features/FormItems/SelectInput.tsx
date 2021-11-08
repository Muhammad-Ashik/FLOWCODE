import React from 'react'
import { Select, Form, Row, Col} from 'antd';
import { SelectInputType, SelectOption } from './InputTypes';


const { Option } = Select;

function SelectInput(props: SelectInputType) {
    const {title, titleSize, name, placeholder, defaultValue, options, disabled, onChange} = props;
    let test:SelectOption[] = options
    return (
        <div>
            <Row>
                <Col span={titleSize}>{title}</Col>
                <Col span={24-titleSize}></Col>
            </Row>
            <Form.Item name={name}>
                <Select
                placeholder={placeholder}
                defaultValue={defaultValue?defaultValue:''}
                disabled={disabled}
                onChange={(e) => onChange(e)}
                >
                    {test.map((item: SelectOption) => {
                        return <Option value={item.value} key={item.value} disabled={item.disabled}>{item.value}</Option> 
                    })}
                </Select>
            </Form.Item>
        </div>
    )
}

export default SelectInput
