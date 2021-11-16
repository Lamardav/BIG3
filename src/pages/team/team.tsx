import { TeamContent } from "./components/teamContent/teamContent";
import React, { useEffect } from "react";
import { reset } from "../../modules/team/teamSlice";
import { useAppDispatch } from "../../core/redux/store";

export const Team = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  return (
    <>
      <TeamContent />
    </>
  );
};
