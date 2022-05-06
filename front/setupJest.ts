import 'jest-preset-angular';
import 'zone.js';
import 'zone.js/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
}
    from '@angular/platform-browser-dynamic/testing';
import { TestBed } from '@angular/core/testing';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());