/// <reference types="cypress" />
import SelectDropdown from '../components/SelectDropdown'
import { Button } from '../components/Button'
import { Control } from '../components/control'
import { TextBox } from '../components/textBox'

export default class CreateStudentFormPage {
  abrirFormulario() {
    cy.contains('Crear Becario').click()
  }

  llenarFormularioDeGraduacion(data: any): void {
    new TextBox('input[name="name"]').setText(data.nombres)
    new TextBox('input[name="lastname"]').setText(data.apellidoPaterno)
    new TextBox('input[name="mothername"]').setText(data.apellidoMaterno)
    new TextBox('input[name="code"]').setText(data.codigoEstudiante)
    new TextBox('input[name="email"]').setText(data.correo)
    new TextBox('input[name="phone"]').setText(data.telefono)

    if (data.becario === "Sí") {
      cy.contains('Becarios')
        .parent()
        .find('input[type="checkbox"]')
        .check({ force: true })

      if (data.horasBecario) {
        cy.get('#total_hours').should('be.visible')
        new TextBox('#total_hours').setText(data.horasBecario)
      }
    }

    cy.contains('button', 'GUARDAR').click()

  }

  verificarCreacionExitosa() {
    cy.contains('¡Estudiante Creado!').should('be.visible')
  }
}