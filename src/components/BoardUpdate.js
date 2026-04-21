import { Button, Form, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

const BoardUpdate = () => {

    const navigate = useNavigate();

    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const [form] = Form.useForm();

    const [searchParam] = useSearchParams();
    const no = searchParam.get('no');

    const onFinish = async (values) => {
        console.log(values);
        values.content = quillRef.current.root.innerHTML;

        const url = `/api/board/update.json?no=${no}`;
        const { data } = await axios.put(url, values);
        console.log(data);
        if (data.status === 200) {
            alert('글이 수정되었습니다.');
            navigate(`/board/view?no=${no}`);
        }
    }

    const handleDate = async () => {
        const url = `/api/board/selectone.json?no=${no}`;
        const { data } = await axios.get(url);
        console.log(data);
        if (data.status === 200) {
            form.setFieldsValue({
                title: data.result.title,
                writer: data.result.writer
            })
            quillRef.current.root.innerHTML = data.result.content;
        }
    };

    useEffect(() => {
        if (!quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow',
            });
        }

        handleDate();
    }, []);

    return (
        <div>
            <h3>게시글 수정</h3>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="title">
                    <Input placeholder='제목을 입력하세요' />
                </Form.Item>

                <Form.Item>
                    <div ref={editorRef} style={{ height: '300px' }}></div>
                </Form.Item>

                <Form.Item name="writer">
                    <Input placeholder='작성자를 입력하세요' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>글 수정</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default BoardUpdate;