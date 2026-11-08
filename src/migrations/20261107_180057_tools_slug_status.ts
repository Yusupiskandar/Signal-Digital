import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // SQLite tidak bisa menambah kolom NOT NULL tanpa default, jadi pakai default '' lalu isi data lama.
  await db.run(sql`ALTER TABLE \`tools\` ADD \`slug\` text DEFAULT '' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`tools\` ADD \`status\` text DEFAULT 'active' NOT NULL;`)
  await db.run(sql`UPDATE \`tools\` SET \`slug\` = CASE \`icon\`
    WHEN 'qr' THEN 'qr-code'
    WHEN 'image' THEN 'jpg-ke-pdf'
    WHEN 'file' THEN 'word-ke-pdf'
    ELSE 'tool-' || \`id\` END WHERE \`slug\` = '';`)
  await db.run(sql`CREATE UNIQUE INDEX \`tools_slug_idx\` ON \`tools\` (\`slug\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`tools_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`tools\` DROP COLUMN \`slug\`;`)
  await db.run(sql`ALTER TABLE \`tools\` DROP COLUMN \`status\`;`)
}