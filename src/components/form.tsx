import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { IDraggableComponent } from './Draggable';

const FormComponent: React.FC<{ 
        selectedComponent: IDraggableComponent, 
        onSubmit: (selectedComponent: IDraggableComponent) => void 
    }> = ({ selectedComponent, onSubmit }) => {

    const [blockValue, setBlockValue] = useState<IDraggableComponent>(selectedComponent)

    const { 
        text,
        X,
        Y,
        fontSize,
        fontWeight,
    } = blockValue;

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        setBlockValue(prev => ({
            ...prev,
            // @ts-ignore
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => onSubmit(blockValue);

    return (
        <Form
            layout="vertical"
            onChange={e => handleChange(e)}
        >
            <Form.Item label="Text">
                <Input name="text" value={text} />
            </Form.Item>
            <Form.Item label="X">
                <Input name="X" value={X} />
            </Form.Item>
            <Form.Item label="Y">
                <Input name="Y" value={Y} />
            </Form.Item>
            <Form.Item label="fontSize">
                <Input name="fontSize" value={fontSize} />
            </Form.Item>
            <Form.Item label="fontWeight">
                <Input name="fontWeight" value={fontWeight} />
            </Form.Item>
            <Form.Item>
                <Button onClick={() => handleSubmit()} type="primary">Submit</Button>
            </Form.Item>
        </Form>
    );
}

export default FormComponent;