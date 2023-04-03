# File-Sync

### https://file-sync.onrender.com

Sync files from one device to another.

![icon](https://user-images.githubusercontent.com/72151831/229601306-fae7a7d3-7d84-4451-b7a4-9241da7e7e3c.png)

## Description

How do you send files from one device to another ?

Imagine, you have a directory on your computer with a lot of files, and you want to send them to your phone. How are you
doing that ? You send them by emails ? You create a WeTransfer ?

Maybe you plug a USB drive to your computer, and you want to send all your photos from your phone to your computer.

That too long and boring to do manually. You want to do it automatically.

So I decided to create a tool to do that : "File-Sync".

File-Sync is a tool to transfer files from one device to another quickly. It's not a backup tool. It's a tool to
transfer files from one device to another.

## Upload file

- Upload text (txt, md, ...)
- Upload file (image, video, pdf, ...)
- Drag and drop multiple file
- Loader while upload

## List files

- List all files
- List files in tabs (one tab per file type)
- Pagination
- Order by date / name / type / size
- Rename file
- Delete file

## Storage rules

- Files are automatically deleted after 1 week (storage is not free ). This is not a backup tool. If you want to keep
  your files, you have to download them. The cron job is running every day at 20:00pm.
- Each file is limited to 1GB.
- Each user is limited to 5GB of storage.

## My profile

- Google and GitHub login
- Edit name
- Edit email
- Edit password
- Delete account

