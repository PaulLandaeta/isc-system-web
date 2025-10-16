/// <reference types="cypress" />

import CreateStudentFormPage from '../support/pages/CreateStudentFormPage'

const formPage = new CreateStudentFormPage()

describe('QA Task 495 - Crear Estudiante', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[name="email"]').type('admin@gmail.com')
    cy.get('input[name="password"]').type('123456')
    cy.contains('Login').click()
  })

  it('Debe abrir el formulario y registrar un estudiante desde fixture', () => {
    cy.fixture('graduationFormData').then((data) => {
      formPage.abrirFormulario()
      formPage.llenarFormularioDeGraduacion(data)
      formPage.verificarCreacionExitosa()
    })
  })
})