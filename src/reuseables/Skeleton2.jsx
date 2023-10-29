import styled from "styled-components";

const Skeleton2 = ({ height = "40px" }) => {
  return (
    <SkeletonStyle role="status">
      <div
        style={{
          height: height,
        }}
        className="inner"
      ></div>
    </SkeletonStyle>
  );
};

export default Skeleton2;

const SkeletonStyle = styled.div`
  width: 97%;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  justify-content: space-around;

  @keyframes pulse {
    50% {
      opacity: 0.2;
    }
  }

  .inner {
    background-color: rgba(0, 0, 0, 0.137);
    border-radius: 0.5rem /* 8px */;
    width: 100%;
  }
`;
