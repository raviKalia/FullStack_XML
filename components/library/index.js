import { JSDOM } from "jsdom";

let xmlDocument;

async function loadXml() {
  if (xmlDocument === undefined) {
    const response = await fetch(
      "http://localhost:8888/library-data.kml"
    );

    const data = new JSDOM(await response.text(), {
      contentType: "application/xml"
    });

    xmlDocument = data.window.document;
  }

  return xmlDocument;
}

async function loadLibrary() {
  xmlDocument = await loadXml();
  return xmlDocument.querySelectorAll("Placemark");
}

async function getLibById(id) {
  xmlDocument = await loadXml();
  return xmlDocument.querySelector(`Placemark[id="${id}"]`);
}

export default {
  loadLibrary,
  getLibById
};