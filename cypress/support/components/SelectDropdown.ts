/// <reference types="cypress" />

const SelectDropdown = {
  select: (selector: string, value: string) => {
    cy.get(selector).select(value);
  }
};

export default SelectDropdown;