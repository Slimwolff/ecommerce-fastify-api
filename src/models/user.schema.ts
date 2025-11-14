import { Type as t , type Static, type TObject} from "@sinclair/typebox"

const userCore = t.Object({
    first_name: t.String(),
    last_name: t.Optional(t.String()),
    birthdate: t.String({ format: "date-time" }),
    gender: t.String(),
    address: t.Optional(t.Record(t.String(), t.Any()))
})

const CreateUserInputSchema = t.Object({
        ...userCore.properties,
        email: t.String({ format: "email" }),
        password: t.String(),
    }, { $id: "CreateUserInput"})


const CreateUserResponse = t.Object({
    id: t.String(),
    ...userCore.properties,
    email: t.String({ format: "email" })
}, {
    $id: "CreateUserResponse"
})



const userSchemas = [CreateUserInputSchema, CreateUserResponse]

type CreateUserInput = Static<typeof CreateUserInputSchema>;
export {
    CreateUserInputSchema,
    CreateUserResponse,
    type CreateUserInput
}
// interface schemaPreset {
//     $id: string;
//     type: string;
//     required?: string[];
//     properties: Record<string, Record<string, string | number | boolean | Record<string, any>>>;
// }

// const CreateUserSchema: schemaPreset = {
//   $id: "userSchema",
//   type: "object",
//   required: [
//     "first_name",
//     "birthdate",
//     "gender",
//     "email",
//     "password",
//   ],
//   properties: {
//     id: {
//       type: "integer",
//       description: "Auto-incremented user ID"
//     },
//     first_name: {
//       type: "string",
//       maxLength: 255
//     },
//     last_name: {
//       type: "string",
//       maxLength: 255,
//       nullable: true
//     },
//     birthdate: {
//       type: "string",
//       format: "date-time"
//     },
//     gender: {
//       type: "string",
//       minLength: 1,
//       maxLength: 1
//     },
//     address: {
//       type: "object",
//       nullable: true,
//       additionalProperties: true // because Prisma.Json can be any object
//     },
//     email: {
//       type: "string",
//       format: "email",
//       maxLength: 255
//     },
//     password: {
//       type: "string",
//       minLength: 1
//     },
//     salt: {
//       type: "string",
//       minLength: 1
//     },
//     order: {
//       type: "array",
//       items: { type: "object" } // replace with $ref if you create Order schema
//     },
//     whishlist: {
//       type: "array",
//       items: { type: "object" } // same idea — placeholder for wishlist schema
//     },
//     created_at: {
//       type: "string",
//       format: "date-time"
//     },
//     updated_at: {
//       type: "string",
//       format: "date-time"
//     }
//   }
// };

// const userSchemas = [CreateUserSchema];
// export default userSchemas

