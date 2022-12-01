import supertest from "supertest";

import router from "../routes/movies.js";

const request = supertest(router);

// testing Http Post method
describe("POST /movies", () => {
  it("should response with a 201 status code", async () => {
    const response = await request.post("/movies").send({
      title: "title",
      director: "director",
      release_date: "2006",
    });
    expect(response.statusCode).toBe(201);
  });

  it("should respond with a status code of 400 when missing one fiele or more", async () => {
    const bodyData = [
      { title: "title" },
      { director: "director" },
      { release_date: "2006" },
      {},
    ];
    for (const body of bodyData) {
      const response = await request.post("/movies").send(body);
      expect(response.statusCode).toBe(401);
    }
  });

  it("should specify json in the content type header", async () => {
    const response = await request.post("/movies").send({
      title: "title",
      director: "director",
      release_date: "2006",
    });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

// testing Http DELETE method
describe("DELETE /movies/:id", () => {
  it("should response with a 200 status code", async () => {
    const response = await request.delete("/movies/id").send({
      id: "id",
    });
    expect(response.statusCode).toBe(201);
  });

  it("should respond with a status code of 400", async () => {
    const bodyData = [{ id: "id" }];
    const response = await request
      .delete("/movies")
      .send(` No movie found with this id ${bodyData.id}`);
    expect(response.statusCode).toBe(401);
  });
});
