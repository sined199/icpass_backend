import $ from "jquery";
import { WOW } from "wowjs";
import Typed from "typed.js";
import "bootstrap";

// Make the ICPass app's public methods available locally
import { icpass } from "canisters/icpass";
import { icpass_assets } from "canisters/icpass_assets";

import {
  ownProfilePageTmpl,
  profilePageTmpl,
  searchResultsPageTmpl,
} from "./templates";
import { injectHtml } from "./utils";

import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import "./index.css";

window.$ = window.jQuery = $;

icpass_assets
  .retrieve("index.html")
  .then(injectHtml)
  .then(() =>
    $(document).ready(function () {
      // Reveal animations.
      const wow = new WOW();
      wow.init();

      const state = {
        profile: {},
        results: [],
      };

      //
      function renderNavbar() {
        const navbar = $(".navbar-custom");
        if (navbar.width() < 576) {
          navbar.addClass("collapse-custom");
        } else {
          navbar.removeClass("collapse-custom");
        }
      }

      renderNavbar();
      $(window).resize(function () {
        renderNavbar();
      });

      //
      function renderIntro() {
        const windowHeight = $(window).innerHeight();
        $(".intro").css("height", windowHeight);
      }
      renderIntro();
      $(window).resize(function () {
        renderIntro();
      });

      new Typed("#typed", {
        cursorChar: "_",
        strings: [
          "n&nbsp;autonomous",
          "&nbsp;transparent",
          "n&nbsp;unstoppable",
          "&nbsp;tamperproof",
        ],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 3000,
        loop: true,
      });

      // Disable submit button.
      function disableSubmitButton(btn) {
        btn.prop("disabled", true);
        btn.empty();
        btn.append('<i class="fa fa-cog fa-spin"></i> Wait...');
      }

      // Enable submit button.
      function enableSubmitButton(btn, phrase) {
        btn.empty();
        btn.append(phrase);
        btn.prop("disabled", false);
      }

      function clearAdminSections() {
        $(".profile").hide();
        $(".edit").hide();
        $(".search").hide();
      }

      function renderOwnProfile() {
        clearAdminSections();
        (async function () {
          try {
            const ownId = await icpass.getOwnId();
            const data = await icpass.get(ownId);
            $(".profile").html(ownProfilePageTmpl(data)).show();
          } catch (err) {
            console.error(err);
          }
        })();
      }

      function renderProfile(userId) {
        clearAdminSections();
        (async function () {
          try {
            let data = await icpass.get(userId);
            state.profile = data;
            $(".profile").html(profilePageTmpl(data)).show();
          } catch (err) {
            console.error(err);
          }
        })();
      }

      function renderEdit(userId) {
        clearAdminSections();
        $(".edit").show().find("#full-name").focus();

        (async function () {
          let result = {};
          if (userId) {
            result = await icpass.get(userId);
          }
          updateForm(result);
        })();
      }

      function renderSearch(term) {
        clearAdminSections();

        (async function () {
          try {
            const results = await icpass.search(term);
            state.results = results;
            $(".search").html(searchResultsPageTmpl(results)).show();
          } catch (err) {
            console.error(err);
          }
        })();
      }

      $("#edit-form").submit(function (event) {
        event.preventDefault();
        const button = $(this).find('button[type="submit"]');
        disableSubmitButton(button);

        const fullName = $(this).find("#full-name").val();
        const email_notification = $(this).find("#email_notification").val();
        const system_notification = $(this).find("#system_notification").val();
        const show_wallet_number = $(this).find("#show_wallet_number").val();

        async function action() {
          // Call Profile's public methods without an API
          await icpass.create({
              fullName,
              email_notification,
              system_notification,
              show_wallet_number
          });
          renderOwnProfile();
          enableSubmitButton(button, "Submit");
        }
        action();
      });

      $("a#edit").click(function () {
        renderEdit();
      });

      $("a#profile").click(function () {
        renderOwnProfile();
      });

      $("a#login").click(function () {
        $(".splash-view").slideUp(0, "linear");
        $(".admin-view").slideDown(250, "linear");
        renderOwnProfile();
      });

      $(".preloader-canvas").fadeOut(1000, "linear");

      const updateById = (selector, text) =>
        (document.querySelector(selector).innerHTML = text);

      const updateForm = (model) => {
        const { id, fullName, email_notification, system_notification, show_wallet_number } = model;
        updateById("#full-name", fullName);
        updateById("#email_notification", email_notification);
        updateById("#system_notification", system_notification);
        updateById("#show_wallet_number", show_wallet_number);
      };

      // Actions

      const showEdit = () => {
        renderEdit();
      };

      const showProfile = (index) => {
        const profile = state.results[index];
        renderProfile(profile.id);
      };

      const search = () => {
        const searchInputEl = document.getElementById("search");
        renderSearch(searchInputEl.value);
      };

      window.actions = {
        showProfile,
        search,
        showEdit,
      };
    })
  );
