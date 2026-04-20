import { Button, Input, Pagination, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const Board = () => {
    //컬럼의 명칭, dataindex는 백엔드에서 오는 키값, key는 고유한 키값
    const columns = [
        { title: '번호', dataIndex: 'num', key: 'num' },
        { title: '제목', dataIndex: 'title', key: 'title' },
        { title: '작성자', dataIndex: 'writer', key: 'writer' },
        { title: '조회수', dataIndex: 'hit', key: 'hit' },
        { title: '작성일', dataIndex: 'regdate2', key: 'regdate' },
    ]

    const [page, setPage] = useState(1);
    const [text, setText] = useState('');
    const [cnt, setCnt] = useState(10);
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);

    const handleData = async () => {
        const url = `/api/board/select.json?page=${page}&text=${text}&cnt=${cnt}`;
        const { data } = await axios.get(url);
        console.log(data);
        if (data.status === 200) {
            setRows(data.rows);
            setTotal(data.total);
        }
    }

    const processedRows = useMemo(() => {
        return rows.map((row, index) => {
            return {
                ...row,
                key: row._id,
                num: total - (page - 1) * cnt - index,
            }
        })
    }, [rows]); // 본래 백엔드에서 해줘야 함

    const onChange = (page) => {
        setPage(page);
    }

    useEffect(() => {
        handleData();
    }, [page, text]);

    return (
        <div>
            <h3>게시판</h3>

            <Link to={`/board/write`}><Button>글쓰기</Button></Link>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Input placeholder='검색어를 입력하세요'
                    style={{ width: 300 }}
                    value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <br />

            <Table columns={columns} dataSource={processedRows} pagination={false} />

            <Pagination align='center' defaultCurrent={page} total={total}
                showSizeChanger={false} onChange={onChange} />
        </div>
    );
};

export default Board;