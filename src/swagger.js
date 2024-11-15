// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = 
  {
    definition: {
      "openapi": "3.0.3",
      "info": {
        "title": "API Rick And Morty",
        "description": "Rick And Morty Api",
        "termsOfService": "http://swagger.io/terms/",
        "version": "1.0."
      },
      "servers": [
        {
          "url": "https://localhost:8080/RickAndMorty"
        }
      ],
      "paths": {
        "/favoriteCharacters/add/{userId}": {
          "post": {
            "tags": [
              "Favorite Characters"
            ],
            "summary": "Add a new favorite character.",
            "description": "Add a new favorite character.",
            "operationId": "addFavCharacter",
            "parameters": [
              {
                "name": "userId",
                "in": "path",
                "description": "ID of the user.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "description": "Add a new favorite character.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Favorite"
                  }
                },
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/Favorite"
                  }
                },
                "application/x-www-form-urlencoded": {
                  "schema": {
                    "$ref": "#/components/schemas/Favorite"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Favorite"
                    }
                  },
                  "application/xml": {
                    "schema": {
                      "$ref": "#/components/schemas/Favorite"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid input"
              },
              "422": {
                "description": "Validation exception"
              }
            }
          }
        },
        "/favoriteCharacters/{userId}": {
          "get": {
            "tags": [
              "Favorite Characters"
            ],
            "summary": "Shows the list of all favorite characters.",
            "description": "Shows a list of all the user's favorite characters.",
            "operationId": "favCharacters",
            "parameters": [
              {
                "name": "userId",
                "in": "path",
                "description": "ID of the user.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Favorite"
                      }
                    }
                  },
                  "application/xml": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Favorite"
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid status value"
              }
            }
          }
        },
        "/favoriteCharacters/delete/{userId}/{characterId}": {
          "delete": {
            "tags": [
              "Favorite Characters"
            ],
            "summary": "Deletes a character from the user's favorite list.",
            "description": "delete a character from the user's favorite list.",
            "operationId": "deleteFavCharacter",
            "parameters": [
              {
                "name": "userId",
                "in": "path",
                "description": "User's favorite characters list.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "characterId",
                "in": "path",
                "description": "Character to remove from the user's favorite character list.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "400": {
                "description": "Invalid user or character value"
              }
            }
          }
        },
        "/obtainedCharacters/{userId}": {
          "get": {
            "tags": [
              "Obtained Characters"
            ],
            "summary": "Returns user's obteined characters.",
            "description": "Returns the list of user's obteined characters",
            "operationId": "getObtaindedCharacters",
            "parameters": [
              {
                "name": "userId",
                "in": "path",
                "description": "User's obtained characters list.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/obtainedCharacters/add/{userId}": {
          "post": {
            "tags": [
              "Obtained Characters"
            ],
            "summary": "Add a character to the user's obtained character list.",
            "description": "Add a character to the user's obtained character list.",
            "operationId": "obtainedCharacters",
            "parameters": [
              {
                "name": "userId",
                "in": "path",
                "description": "User's obtained characters list.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ObtainedCharacter"
                  }
                },
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/ObtainedCharacter"
                  }
                },
                "application/x-www-form-urlencoded": {
                  "schema": {
                    "$ref": "#/components/schemas/ObtainedCharacter"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/ObtainedCharacter"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid input"
              },
              "422": {
                "description": "Validation exception"
              }
            }
          }
        },
        "/obtainedCharacters/delete/{userId}/{characterId}": {
          "delete": {
            "tags": [
              "Obtained Characters"
            ],
            "summary": "Delete obtained character.",
            "description": "Delete a character from user's obtained list.",
            "operationId": "deleteObtainedCharacter",
            "parameters": [
              {
                "name": "userId",
                "in": "path",
                "description": "ID of the user's obtained characters list.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "characterId",
                "in": "path",
                "description": "ID of the character.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "400": {
                "description": "Invalid user or character Id"
              },
              "404": {
                "description": "Not found"
              }
            }
          }
        },
        "/user": {
          "post": {
            "tags": [
              "User"
            ],
            "summary": "Create user",
            "description": "Create an account.",
            "operationId": "createUser",
            "requestBody": {
              "description": "Created user object",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                },
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                },
                "application/x-www-form-urlencoded": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "responses": {
              "default": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/User"
                    }
                  },
                  "application/xml": {
                    "schema": {
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
              }
            }
          }
        },
        "/user/{username}": {
          "get": {
            "tags": [
              "User"
            ],
            "summary": "Get user by user name",
            "description": "",
            "operationId": "getUserByName",
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "description": "The name that needs to be fetched.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/User"
                    }
                  },
                  "application/xml": {
                    "schema": {
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid username supplied"
              },
              "404": {
                "description": "User not found"
              }
            }
          }
        },
        "/auction/add/{userId}": {
          "post": {
            "tags": [
              "Auction"
            ],
            "summary": "Create an auction",
            "description": "Add a new auction.",
            "operationId": "addAuction",
            "parameters": [
              {
                "name": "userId",
                "in": "path",
                "description": "ID of the user.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "description": "Add a new auction.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Auction"
                  }
                },
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/Auction"
                  }
                },
                "application/x-www-form-urlencoded": {
                  "schema": {
                    "$ref": "#/components/schemas/Auction"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Auction"
                    }
                  },
                  "application/xml": {
                    "schema": {
                      "$ref": "#/components/schemas/Auction"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid input"
              },
              "422": {
                "description": "Validation exception"
              }
            }
          }
        },
        "/auctions": {
          "get": {
            "tags": [
              "Auction"
            ],
            "summary": "Shows the list of all auctions.",
            "description": "Shows a list of all available auctions.",
            "operationId": "auctions",
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Auction"
                      }
                    }
                  },
                  "application/xml": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Auction"
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid status value"
              }
            }
          }
        },
        "/auctions/{userId}": {
          "get": {
            "tags": [
              "Auction"
            ],
            "summary": "Shows the list of user's auctions.",
            "description": "Shows a list of the user's auctions.",
            "operationId": "UserAuctions",
            "parameters": [
              {
                "name": "userId",
                "in": "path",
                "description": "User Id.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Auction"
                      }
                    }
                  },
                  "application/xml": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Auction"
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid status value"
              }
            }
          }
        },
        "/auction/delete/{aucId}/{userId}": {
          "delete": {
            "tags": [
              "Auction"
            ],
            "summary": "Deletes an auction.",
            "description": "delete an auction.",
            "operationId": "deleteAuction",
            "parameters": [
              {
                "name": "aucId",
                "in": "path",
                "description": "Auction Id.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "userId",
                "in": "path",
                "description": "User who wants do delete an auction.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "400": {
                "description": "Invalid user or character value"
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "Auction": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "userId": {
                "type": "string"
              },
              "character1Id": {
                "type": "integer",
                "format": "int32",
                "example": 1
              },
              "character2Id": {
                "type": "integer",
                "format": "int32",
                "example": 7
              },
              "startDate": {
                "type": "string",
                "format": "date-time"
              },
              "finishDate": {
                "type": "string",
                "format": "date-time"
              },
              "complete": {
                "type": "boolean"
              }
            },
            "xml": {
              "name": "auction"
            }
          },
          "Favorite": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "userId": {
                "type": "string"
              },
              "characterId": {
                "type": "integer",
                "format": "int32",
                "example": 1
              }
            },
            "xml": {
              "name": "favorite"
            }
          },
          "ObtainedCharacter": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "userId": {
                "type": "string"
              },
              "characterId": {
                "type": "integer",
                "format": "int32",
                "example": 1
              },
              "obtainedMethod": {
                "type": "string",
                "enum": [
                  "captured",
                  "exchanged"
                ],
                "example": "captured"
              }
            },
            "xml": {
              "name": "obtainedCharacter"
            }
          },
          "User": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "username": {
                "type": "string",
                "example": "theUser"
              },
              "firstName": {
                "type": "string",
                "example": "John"
              },
              "lastName": {
                "type": "string",
                "example": "James"
              },
              "email": {
                "type": "string",
                "example": "john@email.com"
              },
              "password": {
                "type": "string",
                "example": "12345"
              }
            },
            "xml": {
              "name": "user"
            }
          },
          "ApiResponse": {
            "type": "object",
            "properties": {
              "code": {
                "type": "integer",
                "format": "int32"
              },
              "type": {
                "type": "string"
              },
              "message": {
                "type": "string"
              }
            },
            "xml": {
              "name": "##default"
            }
          }
        },
        "requestBodies": {
          "User": {
            "description": "User object.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "UserArray": {
            "description": "List of user object",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          },
          "AuctionArray": {
            "description": "List of all auctions",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Auction"
                  }
                }
              }
            }
          }
        }
      }
    },
    apis: ["./controllers/*.ts"],
  };

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;