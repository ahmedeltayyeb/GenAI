import cloudconvert
import hashlib
import os
from dotenv import load_dotenv


def convert(path, debug=False):
    # we need api key here
    cloudconvert.configure(
        api_key=os.getenv("API_KEY"),
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
