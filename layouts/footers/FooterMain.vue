<template>
  <div class="footer-wrapper">
    <div class="footer">
      <div class="contacts-wrapper">
        <div class="contacts">
          <div class="location">
            <a
              href="https://maps.app.goo.gl/TV82VnCCFqWFcaM2A"
              class="sharing-item"
              target="_blank"
              ><img src="~assets/icon_location.png" alt="icon"
            /></a>
            <a href="https://maps.app.goo.gl/TV82VnCCFqWFcaM2A" target="_blank"
              >м. Авдіївка, вул. Молодіжна, 3А</a
            >
          </div>
          <div class="phone-number">
            <a href="tel:+380987654321" class="sharing-item">
              <img src="~assets/icon_phone.png" alt="icon" />
            </a>
            <a href="tel:+380987654321">+38 098 765-43-21</a>
          </div>
        </div>
        <div class="sharing">
          <a
            href="https://www.facebook.com/cfhopeua"
            target="_blank"
            class="sharing-item social"
          >
            <img src="~assets/icons_footer_main/facebook.png" alt="facebook" />
          </a>
          <a
            href="https://t.me/cfhopeua"
            target="_blank"
            class="sharing-item social"
          >
            <img src="~assets/icons_footer_main/telegram.png" alt="telegram" />
          </a>
          <a
            href="viber://chat?number=+380987654321"
            class="sharing-item social"
            target="_blank"
          >
            <img src="~assets/icons_footer_main/viber.png" alt="viber" />
          </a>
          <a
            href="https://www.instagram.com/cfhopeua/"
            class="sharing-item instagram social"
            target="_blank"
          >
            <img
              src="~assets/icons_footer_main/instagram.png"
              alt="instagram"
            />
          </a>
        </div>
      </div>
      <div class="additional-links">
        <nuxt-link to="/donation-service-terms" class="terms-link">
          Умови використання
        </nuxt-link>
        <nuxt-link to="/privacy-policy" class="terms-link">
          Політика конфіденційності
        </nuxt-link>
      </div>
      <div class="developers">
        <nuxt-link to="/" class="developers-link">
          <img
            src="~assets/Avatar.png"
            alt="Avatar logo"
            width="50"
            height="50"
          />
          <p>
            Розроблено AlexMel83 ©<br />
            всі права захищені 2024
          </p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.footer-wrapper {
  background-color: var(--footer-bg);
  margin-top: auto;
}

.footer {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
}

.footer .contacts {
  display: flex;
  flex-direction: column;
}

.sharing {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 24px 36px 0px 36px;
}

.footer .contacts a {
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 10px;
  text-decoration: none;
}

.footer .contacts .sharing-item {
  margin-right: 13px;
  background-color: var(--icons-contact-bg);
}

.footer .contacts .phone-number {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.footer .contacts .location {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
}

.sharing-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30.23px;
  height: 30.23px;
  border-radius: 50%;
}

.sharing-item.social img {
  border-radius: 50%;
  transition: transform 0.3s;
  width: 30px;
  height: 30px;
}

.sharing-item.social:hover img {
  transform: scale(1.2);
}

.sharing-item.social:active img {
  border: 2px solid var(--btn-border);
}

.additional-links {
  display: flex;
  flex-direction: column;
}

.terms-link {
  color: var(--white-color);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.terms-link:hover {
  text-decoration: underline;
}

.developers-link {
  display: flex;
}

.developers-link p {
  color: var(--white-color);
  margin-left: 33px;
  align-self: center;
  text-decoration: underline;
}

@media (min-width: 768px) {
  .footer {
    justify-content: center;
    padding-bottom: 24px;
  }

  .contacts-wrapper {
    display: flex;
    align-items: center;
  }

  .sharing {
    width: 115px;
    height: 124px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 0 0 200px;
  }

  a.sharing-item {
    width: 30px;
    height: 30px;
  }

  .sharing-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 5px;
  }

  .additional-links {
    flex-direction: row;
    gap: 10px;
  }

  .developers-link {
    margin-top: 24px;
  }
}

@media (min-width: 1440px) {
  .footer {
    padding: 24px 64px;
  }

  .footer .contacts {
    flex-direction: row;
    align-items: center;
  }

  .footer .contacts .location {
    margin: 0 16px;
  }

  .sharing {
    width: 300px;
    height: 60px;
    align-items: center;
  }
}
</style>
