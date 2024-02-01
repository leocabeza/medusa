import {
  MODULE_RESOURCE_TYPE,
  MODULE_SCOPE,
  ModuleDefinition,
} from "@medusajs/types"

import { upperCaseFirst } from "@medusajs/utils"

export enum Modules {
  AUTH = "auth",
  CACHE = "cacheService",
  CART = "cart",
  CUSTOMER = "customer",
  EVENT_BUS = "eventBus",
  INVENTORY = "inventoryService",
  LINK = "linkModules",
  PAYMENT = "payment",
  PRICING = "pricingService",
  PRODUCT = "productService",
  PROMOTION = "promotion",
  SALES_CHANNEL = "salesChannel",
  STOCK_LOCATION = "stockLocationService",
  USER = "user",
  WORKFLOW_ENGINE = "workflows",
}

export enum ModuleRegistrationName {
  AUTH = "authModuleService",
  CACHE = "cacheService",
  CART = "cartModuleService",
  CUSTOMER = "customerModuleService",
  EVENT_BUS = "eventBusModuleService",
  INVENTORY = "inventoryService",
  PAYMENT = "paymentModuleService",
  PRICING = "pricingModuleService",
  PRODUCT = "productModuleService",
  PROMOTION = "promotionModuleService",
  SALES_CHANNEL = "salesChannelModuleService",
  STOCK_LOCATION = "stockLocationService",
  USER = "userModuleService",
  WORKFLOW_ENGINE = "workflowsModuleService",
}

export const MODULE_PACKAGE_NAMES = {
  [Modules.AUTH]: "@medusajs/auth",
  [Modules.CACHE]: "@medusajs/cache-inmemory",
  [Modules.CART]: "@medusajs/cart",
  [Modules.CUSTOMER]: "@medusajs/customer",
  [Modules.EVENT_BUS]: "@medusajs/event-bus-local",
  [Modules.INVENTORY]: "@medusajs/inventory",
  [Modules.LINK]: "@medusajs/link-modules",
  [Modules.PAYMENT]: "@medusajs/payment",
  [Modules.PRICING]: "@medusajs/pricing",
  [Modules.PRODUCT]: "@medusajs/product",
  [Modules.PROMOTION]: "@medusajs/promotion",
  [Modules.SALES_CHANNEL]: "@medusajs/sales-channel",
  [Modules.STOCK_LOCATION]: "@medusajs/stock-location",
  [Modules.USER]: "@medusajs/user",
  [Modules.WORKFLOW_ENGINE]: "@medusajs/workflow-engine-inmemory",
}

export const ModulesDefinition: { [key: string | Modules]: ModuleDefinition } =
  {
    [Modules.EVENT_BUS]: {
      key: Modules.EVENT_BUS,
      isLegacy: true,
      registrationName: ModuleRegistrationName.EVENT_BUS,
      defaultPackage: MODULE_PACKAGE_NAMES[Modules.EVENT_BUS],
      label: upperCaseFirst(ModuleRegistrationName.EVENT_BUS),
      isRequired: true,
      dependencies: ["logger"],
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.STOCK_LOCATION]: {
      key: Modules.STOCK_LOCATION,
      isLegacy: true,
      registrationName: ModuleRegistrationName.STOCK_LOCATION,
      defaultPackage: false,
      label: upperCaseFirst(ModuleRegistrationName.STOCK_LOCATION),
      isRequired: false,
      isQueryable: true,
      dependencies: ["eventBusService"],
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.INVENTORY]: {
      key: Modules.INVENTORY,
      isLegacy: true,
      registrationName: ModuleRegistrationName.INVENTORY,
      defaultPackage: false,
      label: upperCaseFirst(ModuleRegistrationName.INVENTORY),
      isRequired: false,
      isQueryable: true,
      dependencies: ["eventBusService"],
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.CACHE]: {
      key: Modules.CACHE,
      isLegacy: true,
      registrationName: ModuleRegistrationName.CACHE,
      defaultPackage: MODULE_PACKAGE_NAMES[Modules.CACHE],
      label: upperCaseFirst(ModuleRegistrationName.CACHE),
      isRequired: true,
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.PRODUCT]: {
      key: Modules.PRODUCT,
      registrationName: ModuleRegistrationName.PRODUCT,
      defaultPackage: false,
      label: upperCaseFirst(ModuleRegistrationName.PRODUCT),
      isRequired: false,
      isQueryable: true,
      dependencies: [ModuleRegistrationName.EVENT_BUS, "logger"],
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.PRICING]: {
      key: Modules.PRICING,
      registrationName: ModuleRegistrationName.PRICING,
      defaultPackage: false,
      label: upperCaseFirst(ModuleRegistrationName.PRICING),
      isRequired: false,
      isQueryable: true,
      dependencies: ["logger"],
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.PROMOTION]: {
      key: Modules.PROMOTION,
      registrationName: ModuleRegistrationName.PROMOTION,
      defaultPackage: false,
      label: upperCaseFirst(ModuleRegistrationName.PROMOTION),
      isRequired: false,
      isQueryable: true,
      dependencies: ["logger"],
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.AUTH]: {
      key: Modules.AUTH,
      registrationName: ModuleRegistrationName.AUTH,
      defaultPackage: false,
      label: upperCaseFirst(ModuleRegistrationName.AUTH),
      isRequired: false,
      isQueryable: true,
      dependencies: ["logger"],
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.WORKFLOW_ENGINE]: {
      key: Modules.WORKFLOW_ENGINE,
      registrationName: ModuleRegistrationName.WORKFLOW_ENGINE,
      defaultPackage: false,
      label: upperCaseFirst(ModuleRegistrationName.WORKFLOW_ENGINE),
      isRequired: false,
      isQueryable: true,
      dependencies: ["logger"],
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.SALES_CHANNEL]: {
      key: Modules.SALES_CHANNEL,
      registrationName: ModuleRegistrationName.SALES_CHANNEL,
      defaultPackage: false,
      label: upperCaseFirst(ModuleRegistrationName.SALES_CHANNEL),
      isRequired: false,
      isQueryable: true,
      dependencies: ["logger"],
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.CART]: {
      key: Modules.CART,
      registrationName: ModuleRegistrationName.CART,
      defaultPackage: false,
      label: upperCaseFirst(ModuleRegistrationName.CART),
      isRequired: false,
      isQueryable: true,
      dependencies: ["logger"],
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.CUSTOMER]: {
      key: Modules.CUSTOMER,
      registrationName: ModuleRegistrationName.CUSTOMER,
      defaultPackage: false,
      label: upperCaseFirst(ModuleRegistrationName.CUSTOMER),
      isRequired: false,
      isQueryable: true,
      dependencies: ["logger"],
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.PAYMENT]: {
      key: Modules.PAYMENT,
      registrationName: ModuleRegistrationName.PAYMENT,
      defaultPackage: false,
      label: upperCaseFirst(ModuleRegistrationName.PAYMENT),
      isRequired: false,
      isQueryable: true,
      dependencies: ["logger"],
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
    [Modules.USER]: {
      key: Modules.USER,
      registrationName: ModuleRegistrationName.USER,
      defaultPackage: false,
      label: upperCaseFirst(ModuleRegistrationName.USER),
      isRequired: false,
      canOverride: true,
      isQueryable: true,
      dependencies: ["logger"], 
      defaultModuleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resources: MODULE_RESOURCE_TYPE.SHARED,
      },
    },
  }

export const MODULE_DEFINITIONS: ModuleDefinition[] =
  Object.values(ModulesDefinition)

export default MODULE_DEFINITIONS
