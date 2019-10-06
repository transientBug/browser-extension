import request from "../request";
import { Bookmark } from "../types";

import debugFactory from "../debug";
const debug: debug.IDebugger = debugFactory.extend("bookmarks");

const save = async (bookmark: Partial<Bookmark>): Promise<Bookmark> => {
  debug("upserting bookmark", bookmark);

  const body = {
    data: {
      type: "bookmark",
      attributes: {
        ...bookmark
      }
    }
  };

  debug("POST body", body);

  const {
    data: { attributes, id }
  } = await request({ method: "POST", path: "/api/v1/bookmarks", body });

  return { ...attributes, id };
};

const update = async (
  id: string | number,
  bookmark: Partial<Bookmark>
): Promise<Bookmark> => {
  debug("updating bookmark by id", id, bookmark);

  const body = {
    data: {
      type: "bookmark",
      attributes: {
        id,
        ...bookmark
      }
    }
  };

  debug("PATCH body", body);

  const {
    data: { attributes }
  } = await request({ method: "PATCH", path: `/api/v1/bookmarks/${id}`, body });

  return { ...attributes, id };
};

export default { save, update };
