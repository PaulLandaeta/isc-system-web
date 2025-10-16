/// <reference types="cypress" />
import { Control } from './control';

export class Icon extends Control {
  constructor(selector: string) {
    super(selector);
  }
}
