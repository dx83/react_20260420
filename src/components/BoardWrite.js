import { Button, Form, Input } from 'antd';
import React, { useEffect, useRef } from 'react';
import axios from 'axios';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

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

const BoardWrite = () => {
    const navigate = useNavigate();

    // div의 ref를 담을 변수, div와 연결시킬 변수
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        // 연결된 항목이 있을때
        if (!quillRef.current) {
            // Quill 에디터를 생성
            quillRef.current = new Quill(editorRef.current, {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow',
            });
        }
    }, []);

    const onFinish = async (values) => {
        // values에 content라는 키값으로 에디터에 입력된 내용을 가져와서 저장
        values.content = quillRef.current.root.innerHTML;
        console.log(values);

        const url = `/api/board/insert.json`;
        const { data } = await axios.post(url, values);
        if (data.status === 200) {
            alert('글쓰기 성공');
            navigate('/board');
        }
    }

    return (
        <div>
            <h3>게시판 글쓰기</h3>
            <Form
                onFinish={onFinish}>
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
                    <Button type='primary' htmlType='submit'>글쓰기</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default BoardWrite;