import { Button, Form, Input } from 'antd';
import axios from 'axios';
import mqtt from 'mqtt';
import React, { use, useEffect, useState } from 'react';

const Chat = () => {

    const [mqttClient, setMqttClient] = useState(null);
    const [output, setOutput] = useState([]);

    const handleMessage = async () => {
        const url = `/api/message/select.json?_id=${0}&topic=class207/%23`;
        const { data } = await axios.get(url);
        for (let i = 0; i < data.result.length; i++) {
            setOutput((prev) => [...prev, {
                topic: data.result[i].publisher,
                message: data.result[i].content,
                timestamp: data.result[i].regdate,
            }])
        }
    }

    useEffect(() => {

    }, []);

    useEffect(() => {
        const client = mqtt.connect("ws://192.168.0.7:19001", {
            clean: true,
            connectTimeout: 2000,
            clientId: `cid3_${new Date().getTime()}`
        });

        client.on('connect', () => {
            console.log('연결 성공');
        });


        client.on('message', (topic, message) => {
            const json = JSON.parse(message.toString());
            console.log(`메시지 도착 => ${topic} : ${json.message}`);
            setOutput((prev) => [{
                topic: topic,
                message: json.message,
                timestamp: new Date().toLocaleString(),
            }, ...prev])
        });

        client.on('error', (err) => {
            console.error(`연결 실패 => ${err}`);
            client.reconnect();
        });

        setMqttClient(client); // MQTT 클라이언트 상태 업데이트

        handleMessage();

        return () => {
            client.end();
        } // 컴포넌트가 언마운트될 때 MQTT 클라이언트를 종료하여 리소스 누수 방지
    }, []);

    useEffect(() => {
        if (mqttClient) {
            mqttClient.subscribe("class207/#");
        }

        return () => {
            if (mqttClient) {
                mqttClient.unsubscribe("class207/#");
            }
        }
    }, [mqttClient]);

    const onFinish = async (values) => {
        if (mqttClient) {
            const url = `/api/message/insert.json`;

            values.topic = "class207/#";
            values.publisher = "class207/cid3"
            values.content = values.message;

            const { data } = await axios.post(url, values);
            console.log(data);

            if (data.status === 200) {
                mqttClient.publish("class207/cid3", JSON.stringify(values));
            }
        }
    };

    return (
        <div>
            <h1>채팅</h1>
            <Form onFinish={onFinish}>
                <Form.Item name="message">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        보내기
                    </Button>
                </Form.Item>
            </Form>
            <hr />
            <div>
                {output.map((msg, index) => (
                    <div key={index}>
                        <p><strong>{msg.topic}</strong> ( {msg.timestamp} ) : {msg.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;