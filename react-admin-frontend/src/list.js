import React from 'react';
import { List, Datagrid, TextField, Create, SimpleForm, ReferenceInput, SelectInput, ReferenceField, TextInput, Edit } from 'react-admin';

export const PostList = props => (
    <List {...props}>
        <Datagrid>
            <ReferenceField source="id" reference="list">
                <TextField source="title" />
            </ReferenceField>
            <TextField source="description" />
        </Datagrid>
    </List>
);

export const PostEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput multiline source="description" />
        </SimpleForm>
    </Create>
);