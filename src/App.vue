<script setup lang="ts">
import PDFUpload from '@/components/PDFUpload.vue'
import ProductList from '@/components/DisplayProducts.vue'
</script>

<template>
  <header class="noprint">
    <p>
      <a href="https://pawrys.github.io/StockBrowser5/">Stany</a>
      <span> / </span>
      <a href="https://pawrys.github.io/LabelGenerator/">Etykiety</a>
      <span> / </span>
      <a href="https://pawrys.github.io/PurchaseComparator/">Tester</a>
    </p>

    <h1>Etykieter</h1>
  </header>
  <h1>Formularz kontaktowy</h1>
  <main>
    <form action="#" method="post">
      <fieldset>
        <legend>Dane osobowe</legend>

        <div>
          <label for="first-name">Imię</label>
          <input
            type="text"
            id="first-name"
            name="first_name"
            placeholder="Jan"
            autocomplete="given-name"
            required
          />
        </div>

        <div>
          <label for="last-name">Nazwisko</label>
          <input
            type="text"
            id="last-name"
            name="last_name"
            placeholder="Kowalski"
            autocomplete="family-name"
            required
          />
        </div>

        <div>
          <label for="email">Adres e-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="jan@example.com"
            autocomplete="email"
            required
          />
        </div>

        <div>
          <label for="phone">Numer telefonu</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+48 123 456 789"
            autocomplete="tel"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Informacje</legend>

        <div>
          <label for="subject">Temat</label>
          <select id="subject" name="subject">
            <option value="">Wybierz temat</option>
            <option value="question">Pytanie</option>
            <option value="offer">Oferta</option>
            <option value="support">Pomoc techniczna</option>
            <option value="other">Inne</option>
          </select>
        </div>

        <div>
          <label for="message">Wiadomość</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            placeholder="Napisz wiadomość..."
            required
          ></textarea>
        </div>
      </fieldset>

      <fieldset>
        <legend>Dodatkowe informacje</legend>

        <div>
          <p>Preferowany kontakt</p>

          <label>
            <input type="radio" name="contact_method" value="email" checked />
            E-mail
          </label>

          <label>
            <input type="radio" name="contact_method" value="phone" />
            Telefon
          </label>
        </div>

        <div>
          <p>Zainteresowania</p>

          <label>
            <input type="checkbox" name="interests" value="design" />
            Design
          </label>

          <label>
            <input type="checkbox" name="interests" value="development" />
            Programowanie
          </label>

          <label>
            <input type="checkbox" name="interests" value="marketing" />
            Marketing
          </label>
        </div>

        <div>
          <label for="file">Załącznik</label>
          <input type="file" id="file" name="file" />
        </div>
      </fieldset>

      <div>
        <label>
          <input type="checkbox" name="terms" required />
          Akceptuję regulamin i politykę prywatności.
        </label>
      </div>

      <div>
        <button type="reset">Wyczyść</button>
        <button type="submit">Wyślij formularz</button>
      </div>
    </form>
  </main>

  <ProductList />
  <PDFUpload />
</template>

<style scoped></style>
