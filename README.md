# Skinet

Course repository for the Skinet app created on .Net 5.0 and Angular 11 available on Udemy here:

[Udemy course](https://www.udemy.com/course/learn-to-build-an-e-commerce-app-with-net-core-and-angular/?couponCode=FD17A0D1131925BE0179)

If you are looking for the repository for the version of this app created on .Net Core 3.1 and Angular v9 then this is available here:

https://github.com/TryCatchLearn/Skinet3.1

## nestjs

- ref: https://jideowosakin.com/unit-of-work-pattern-in-typescript/

## migrations

- 1️⃣ yarn run typeorm migration:generate -n initial-schema -o
- 2️⃣ yarn typeorm migration:run
- :three: yarn typeorm migration:revert

## error handling

- consistent way of handling errors between all endpoints
- define types of errors:
  - 300 range: redirect
  - 400 range: client error
  - 500 range: server error

```json
{
  "message": "describe error",
  "statusCode": "400 | 401 | 403 | 422 | 500",
  "errors": ["validation error 1", "validation error 2"]
}
```
