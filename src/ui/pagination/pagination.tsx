import React, { useMemo } from "react";
import ReactPaginate from "react-paginate";
import { IPaginationTeams } from "../../api/dto/IGetTeams";
import classes from "./pagination.module.css";
import left from "../../assets/images/Team/pagination/chevron_right_24px.png";
import right from "../../assets/images/Team/pagination/chevron_left_24p.png";
import { useQueryParams } from "../../api/hook/useQueryParams";

export const Pagination: React.FC<IPaginationTeams> = ({ pageCount, changePage, type }) => {
  const query = useQueryParams();
  const queryPage = useMemo(() => query.get("page"), [query]);
  return (
    <div>
      <ReactPaginate
        previousLabel={<img src={left} alt="prev" />}
        nextLabel={<img src={right} alt="next" />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={4}
        pageRangeDisplayed={1}
        forcePage={Number(queryPage) - 1}
        onPageChange={changePage}
        containerClassName={`${classes.pagination} ${classes.justify_content_center}`}
        activeClassName={`${classes.activePage}`}
        activeLinkClassName={`${classes.activePageLink}`}
        nextLinkClassName={`${classes.paginationLinkNext}`}
        disabledClassName={`${classes.paginationLink}`}
        pageLinkClassName={`${classes.paginationItemLink}`}
        previousLinkClassName={`${classes.paginationLinkPrev}`}
      />
    </div>
  );
};
