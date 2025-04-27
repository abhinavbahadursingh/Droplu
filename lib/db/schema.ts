import { pgTable, text, uuid, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Children } from 'react';

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),

    // basic files/folder information
    name: text("name").notNull(),
    path: text("path").notNull(), // /document/project/resume.pdf
    size: integer("size").notNull(),
    type: text("type").notNull(), //"folder"

    // storage information
    fileUrl: text("file_url").notNull(), // url to access file
    thumbnailUrl: text("thumbnail_url"),

    // ownership
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"), // Parent folder if null for root items

    // file/folder/flags
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    // timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/*
parent : each file/folder can have one parent folder
children : each folder can have many child files/folders
*/

export const filesRelations = relations(files , ({one , many}) => ({
    parent: one (files, {
        fields: [files.parentId],
        references: [files.id]
    }),

    //releations ship to child file/folder
    children: many(files)
}))


//type definations

export const File = typeof files.$inferSelect
export const NewFile = typeof files.$inferSelect
/*
ye automatically banata hai ek TypeScript type:
id → string
name → string
size → number
thumbnailUrl → string | null
isFolder → boolean
isStarred → boolea
isTrash → boolean , createdAt → Date , updatedAt → Date
*/