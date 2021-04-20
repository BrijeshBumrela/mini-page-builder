import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';

type RequiredMark = boolean | 'optional';

const FormComponent = () => {
    return (
        <Form
            layout="vertical"
        >
            <Form.Item label="Field A">
                <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Field B">
                <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item>
                <Button type="primary">Submit</Button>
            </Form.Item>
        </Form>
    );
}

export default FormComponent;