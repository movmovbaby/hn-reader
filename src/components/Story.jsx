import React from "react";
import { useParams } from "react-router-dom";

const Story = () => {
  const { id } = useParams();
  return <h1>{`Story ${id}`}</h1>
};

export default Story;
