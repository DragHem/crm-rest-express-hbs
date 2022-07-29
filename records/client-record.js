const { ValidationError } = require("../utils/error");

class ClientRecord {
  constructor(obj) {
    const { id, name, email, nextContactAt, notes } = obj;

    if (!id || typeof id !== "string") {
      throw new ValidationError("ID  musi być niepustym tekstem.");
    }

    if (!name || typeof name !== "string" || name.length < 3) {
      throw new ValidationError(
        "Imię musi być tekstem o długości minimum 3 znaków."
      );
    }

    if (!email || typeof email !== "string" || email.indexOf("@") === -1) {
      throw new ValidationError("E-mail nieprawidłowy.");
    }

    if (typeof nextContactAt !== "string") {
      throw new ValidationError("Data następnego kontaktu musi być tekstem.");
    }

    if (typeof notes !== "string") {
      throw new ValidationError("Notatki muszą być tekstem.");
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.nextContactAt = nextContactAt;
    this.notes = notes;
  }
}

module.exports = {
  ClientRecord,
};
