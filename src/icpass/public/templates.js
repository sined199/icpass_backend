import { Converter } from "showdown";
const converter = new Converter();

/**
 * Profile Page
 */

export const ownProfilePageTmpl = (data) => `
  <div class="lu_profile-page container">
    <div class="row">
      <div class="col-md-8">
        <h4 class="lu_section-header">Profile</h4>
        ${profileTmpl(data)}
        <button class="lu_button lu_edit-button" onclick="actions.showEdit()">Edit</button>
      </div>
    </div>
  </div>
`;

export const profilePageTmpl = (data) => `
  <div class="lu_profile-page container">
    <div class="row">
      <div class="lu_main col-md-8">
        <h4 class="lu_section-header">Profile</h4>
        ${profileTmpl(data)}
      </div>
    </div>
  </div>
`;

const profileTmpl = (data) => `
  <div class="lu_profile">
    <div class="lu_details">
      <h3 class="lu_details_header">${data.fullname}</h3>
    </div>
    ${
      data.experience === ""
        ? ""
        : `
        <div class="lu_experience">
          <h4 class="lu_section-header">Experience</h4>
          <div>${converter.makeHtml(data.experience)}</div>
        </div>
      `
    }
      ${
        data.education === ""
          ? ""
          : `
        <div class="lu_education">
          <h4 class="lu_section-header">Education</h4>
          <div>${converter.makeHtml(data.education)}</div>
        </div>
      `
      }
  </div>
`;

/**
 * Search Results Page
 */

export const searchResultsPageTmpl = (data) => `
  <div class="lu_search-results-page container">
    <h4 class="lu_section-header">Search Results</h4>
    ${searchResultsTmpl(data)}
  </div>
`;

const searchResultsTmpl = (data) =>
  data && data.length ? data.map(searchResultTmpl).join("") : "No results";

const searchResultTmpl = (data, index) => `
  <a class="lu_search-result" onclick="actions.showProfile(${index})">
    <div class="lu_details">
      <h4>${data.fullname}</h4>
    </div>
  </a>
`;
