import React, { useEffect, useState } from "react";

const PacketLatency = () => {
  const [latency, setLatency] = useState(null);

  useEffect(() => {
    // WebSocket 연결을 엽니다: ws://localhost:55455
    const socket = new WebSocket("ws://localhost:55455");

    // WebSocket이 성공적으로 연결되었을 때 호출됩니다.
    socket.onopen = () => {
      console.log("WebSocket에 연결되었습니다.");
    };

    // WebSocket으로부터 메시지를 수신했을 때 호출됩니다.
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data); // 메시지를 JSON 형식으로 변환
      const packetTimestamp = data.timestamp; // 패킷이 전송된 시간 (timestamp)
      const currentTimestamp = Date.now(); // 현재 시간 (밀리초 단위)
      const packetLatency = currentTimestamp - packetTimestamp; // 지연 시간 계산

      setLatency(packetLatency); // 지연 시간을 상태로 설정
    };

    // 컴포넌트가 언마운트 될 때 WebSocket 연결을 닫습니다.
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2>패킷 지연 시간</h2>
      {latency !== null ? (
        <p>지연 시간: {latency} ms</p>
      ) : (
        <p>패킷을 기다리는 중...</p>
      )}
    </div>
  );
};

export default PacketLatency;