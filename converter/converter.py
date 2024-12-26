import cloudconvert
import hashlib
import os


def convert(path, debug=False):
    # we need api key here
    cloudconvert.configure(
        api_key='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGM4YTYxZmY5MzRiNTYxZGQxZGFlNjczN2MxMzM3MWU5YTJjNWQ3YWM1MmIzYzQxOGY2NWNlZmZhOTgzODBkYmJjMWIyOTc4YWY1YjdhOGEiLCJpYXQiOjE3MzM3ODA0MTQuNDgyMjc2LCJuYmYiOjE3MzM3ODA0MTQuNDgyMjc4LCJleHAiOjQ4ODk0NTQwMTQuNDgwMzYyLCJzdWIiOiI3MDQ1MzU2MSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.ZLsosZbe7_CXdHFSC64ciCNNdnQbuFzEl1NNIgyEXHOci7iHvVGXIzwGQ2o9FLPM-7BKsjvsuvEHBbTDq8mDG1ykuMRcXNNCxE9bhikka1habgVPFNRZlxQfdGiZkRGBU1HcFmvX1ZOW89N4GiSIATEwE1TklrFwT3lmTHY07dOF0--ZiMOrGHlpFs5rSbKC0uUaIA7siv4zjNHRE-NIe1R8dGJxJ8H2RAXUW0qXjHbtnkKh1kUSRB3bVDSjWCbDJg8vRput_5JTxaKjAF_arZex5pLatkftGSAZrWCRP8AIWyRNSakfUtSwJR-Lhm-G7jg2feNRwTeGmdf1zNJaSQu3Klz21am0rNnFOuoTOLZJTxTHPDTG20CKU81YBGQKkgpw_X2zaj-2uFpXyho8d5gwwKukoStj9CeROGGtbZj4qVGSp7xfWUZmU_pcOgXRaXr5l8nviB529Gp1j1V3WUGHB8HxdQB95wUmsPgQe4Jpgl2mDhnNdpmRA39DwjpilqfH4ZzduCtRtKboD3Ry0iHP-IKPdb_xufIAjnA4dOF_M-J5n65SVJ3tIoZqg_sIC4GxBfLf02MwEHHRV0HiVVMNGYijN1_bpgZ2oNvx7zhYOjZF5qhTv5F534VNJkaKCOy1Z7YLmEmOw6ag0H4HkRmIlN0ufNmNlj60M8e2xFI',
        sandbox=True)

    job = cloudconvert.Job.create(payload={
        'tasks': {
            'upload-my-file': {
                'operation': 'import/upload'
            },
            'convert-my-file': {
                'operation': 'convert',
                'input': 'upload-my-file',
                'input_format': 'tex',
                'output_format': 'pdf'
            },
            'export-my-file': {
                'operation': 'export/url',
                'input': 'convert-my-file'
            }
        }
    })

    upload_task_id = job['tasks'][0]['id']

    upload_task = cloudconvert.Task.find(id=upload_task_id)
    cloudconvert.Task.upload(file_name=path, task=upload_task)

    export_task_id = job['tasks'][2]['id']
    res = cloudconvert.Task.wait(id=export_task_id)

    file = res.get("result").get("files")[0]
    res = cloudconvert.download(filename=file['filename'], url=file['url'])

    os.startfile(res)

    if debug:
        print(hashlib.md5(open('doc.tex', 'rb').read()).hexdigest())
