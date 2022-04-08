import { PROJECT_NAME } from "$lib/config/general";

const TITLE = "Az oldalról";
const META_DESCRIPTION = `Információk a ${PROJECT_NAME} oldalt illetően.`;
const TYPE = "website";

export const ABOUT_PAGE_SEO = {
  title: TITLE,
  description: META_DESCRIPTION,
  contentType: TYPE,
  image: {
    alt: "DKA logo"
  }

}