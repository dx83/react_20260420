import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Button, Space } from "antd";

function BoardList() {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [text, setText] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = async (currentPage = page, searchText = text) => {
        setLoading(true);
        try {
            const res = await axios.get(
                "/api/board/selectlist.json",
                {
                    params: {
                        page: currentPage,
                        size,
                        text: searchText,
                    },
                }
            );

            setList(res.data.result);
            setTotalCount(res.data.totalCount);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const columns = [
        {
            title: "번호",
            dataIndex: "no",
            key: "no",
        },
        {
            title: "제목",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "작성자",
            dataIndex: "writer",
            key: "writer",
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <h2>게시판 글 목록</h2>

            {/* 검색 영역 */}
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="제목 검색"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onPressEnter={() => {
                        setPage(1);
                        fetchData(1, text);
                    }}
                    style={{ width: 200 }}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        setPage(1);
                        fetchData(1, text);
                    }}
                >
                    검색
                </Button>
            </Space>

            {/* 테이블 */}
            <Table
                rowKey="no"
                columns={columns}
                dataSource={list}
                loading={loading}
                pagination={{
                    current: page,
                    pageSize: size,
                    total: totalCount,
                    onChange: (page) => setPage(page),
                    showSizeChanger: false,
                }}
            />
        </div>
    );
}

export default BoardList;