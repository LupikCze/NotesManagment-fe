import { FC, useState } from "react";

import { Button, Pagination, Table } from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { router } from "../../../../common/router/router";
import { TagDTO } from "../../models/TagDTO/TagDTO";

interface TagsTableProps {
  userIsAdmin: boolean;
  tags: TagDTO[];
}

export const TagsTable: FC<TagsTableProps> = ({ tags, userIsAdmin }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "title",
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const requestSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTags = [...tags].sort((a, b) => {
    // @ts-ignore
    if (a[sortConfig.key as keyof TagDTO] < b[sortConfig.key as keyof TagDTO]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    // @ts-ignore
    if (a[sortConfig.key as keyof TagDTO] > b[sortConfig.key as keyof TagDTO]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredTags = sortedTags.filter((tag) => {
    return Object.values(tag)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const indexOfLastTag = currentPage * itemsPerPage;
  const indexOfFirstTag = indexOfLastTag - itemsPerPage;
  const currentTags = filteredTags.slice(indexOfFirstTag, indexOfLastTag);

  const pageCount = Math.ceil(filteredTags.length / itemsPerPage);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="mb-3 d-flex justify-content-between">
        <input
          style={{ maxWidth: "300px" }}
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {userIsAdmin && (
          <Button
            style={{
              backgroundColor: "#00324e",
              marginLeft: "5px",
              minWidth: "110px",
            }}
            onClick={() => router.navigate({ to: links.createTag() })}
          >
            Create tag
          </Button>
        )}
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th style={{ color: "white", backgroundColor: "#00324e" }}>#</th>
            {Object.keys(tags[0]).map((key) => {
              if (key !== "id") {
                return (
                  <th
                    key={key}
                    style={{
                      color: "white",
                      backgroundColor: "#00324e",
                      cursor: "pointer",
                    }}
                    className={"flex-column flex-nowrap"}
                    onClick={() => requestSort(key)}
                  >
                    <div className={"d-flex"}>
                      {key}
                      {sortConfig.key === key ? (
                        sortConfig.direction === "asc" ? (
                          <span> 🔼</span>
                        ) : (
                          <span> 🔽</span>
                        )
                      ) : null}
                    </div>
                  </th>
                );
              }
              return null;
            })}
          </tr>
        </thead>
        <tbody>
          {currentTags.map((tag, index) => (
            <tr key={tag.id}>
              <td>{index + 1}</td>
              <td>
                <a href={links.tagDetail(tag.id)}>{tag.title}</a>
              </td>
              <td>{tag.user?.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex">
          <select
            className="form-select"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <Pagination className="m-auto">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(pageCount)].map((_, index) => (
            <Pagination.Item
              linkStyle={{
                backgroundColor: index + 1 === currentPage ? "#00324e" : "",
                color: index + 1 === currentPage ? "white" : "",
              }}
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
          />
        </Pagination>
      </div>
    </div>
  );
};
