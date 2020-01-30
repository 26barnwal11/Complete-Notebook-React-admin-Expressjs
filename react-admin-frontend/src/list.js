import React from 'react';
import {Filter , List, Datagrid, TextField, Create, SimpleForm, ReferenceField, TextInput, Edit } from 'react-admin';

const Header = () => {
    return <p>NOTEBOOK</p>
}

const PostTitle = ({ record }) => {
    return <span>{record ? `${record.title}` : ''}</span>;
};

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn />
    </Filter>
);

export const PostList = props => (
    <List title={<Header/>} filters={<PostFilter/>} {...props}>
        <Datagrid>
            <ReferenceField source="id" reference="list">
                <TextField source="title" />
            </ReferenceField>
            <TextField source="description" />
        </Datagrid>
    </List>
);

export const PostEdit = props => (
    <Edit title={<PostTitle/>} {...props} undoable={false}>
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