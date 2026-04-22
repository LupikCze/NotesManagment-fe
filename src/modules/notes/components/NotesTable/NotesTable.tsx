import { FC, useState } from "react";

import { Button, Pagination, Table } from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { router } from "../../../../common/router/router";
import { NoteDTO } from "../../models/NoteDTO/NoteDTO";

interface NotesTableProps {
  userIsAdmin: boolean;
  notes: NoteDTO[];
}

export const NotesTable: FC<NotesTableProps> = ({ notes, userIsAdmin }) => {
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

  const sortedNotes = [...notes].sort((a, b) => {
    // @ts-ignore
    if (
      a[sortConfig.key as keyof NoteDTO] < b[sortConfig.key as keyof NoteDTO]
    ) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    // @ts-ignore
    if (
      a[sortConfig.key as keyof NoteDTO] > b[sortConfig.key as keyof NoteDTO]
    ) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredNotes = sortedNotes.filter((note) => {
    return note.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const indexOfLastNote = currentPage * itemsPerPage;
  const indexOfFirstNote = indexOfLastNote - itemsPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  const pageCount = Math.ceil(filteredNotes.length / itemsPerPage);

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
            onClick={() => router.navigate({ to: links.createNote() })}
          >
            Create note
          </Button>
        )}
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th style={{ color: "white", backgroundColor: "#00324e" }}>#</th>
            {notes[0] &&
              Object.keys(notes[0]).map((key) => {
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
          {currentNotes.map((note, index) => (
            <tr key={note.id}>
              <td>{index + 1}</td>
              <td>
                <a href={links.noteDetail(note.id)}>{note.title}</a>
              </td>
              <td
                style={{
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  maxWidth: "100px",
                }}
              >
                {note.content}
              </td>
              <td>{note.tags?.map((tag) => tag.title + " ")}</td>
              <td>{note.user?.username}</td>
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
