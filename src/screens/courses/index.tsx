import React, { FC } from "react";
import Navbar from "../../components/common/navbar";
import CourseItem from "../../components/courseItem";
import CoursesList from "../../components/lists/coursesList";

const Courses: FC = (): JSX.Element => {
  return (
    <>
      <Navbar pageName="Courses" />
      <CoursesList />
    </>
  );
};

export default Courses;
