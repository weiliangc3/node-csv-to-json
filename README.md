# node-csv-to-json

CSV to JSON script

Used to convert a CSV of 2 `https://` addresses to create a json of redirects. The output is in the `build` folder. The input should be in the src folder to ensure that it is not commited.

The first one is the 'from', the second is the 'to'.

Script takes 3 arguments:
`--src=`: Source file (Default: redirects-worksheet.csv). This file needs to be in the `src` folder.
`--prefix=`: Prefix to the name of the redirects (Default: kbredirect)
`--destination=`: Destination file name (Default: redirects.json)

eg: `npm start -- --src=somefile.csv --prefix=aprefix`
