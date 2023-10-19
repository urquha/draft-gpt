import { Type } from '@sinclair/typebox';

export const ElementStatusSchema = Type.Object({
    element: Type.Number(),
    in_accepted_trade: Type.Boolean(),
    owner: Type.Union([Type.Number(), Type.Null()]),
    status: Type.String()
});

export const ElementStatusArraySchema = Type.Object({
    element_status: Type.Array(ElementStatusSchema)});