import subprocess

WORKING_DIR = "/workdir"
LOG_FIELDS = {
    '%ae': 'author_email',
    '%an': 'author_name',
    '%ad': 'date',
    '%s': 'message',
    '%H': 'sha'
}
LOG_FORMAT = '%x1f'.join(LOG_FIELDS) + '%x1e'


def get_log():
    proc = subprocess.Popen(
        ['git', 'log', '--format="{}"'.format(LOG_FORMAT)],
        cwd=WORKING_DIR,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE, )
    out, err = proc.communicate()
    # TODO proper logging
    print("Got git err output", err)
    rows = [row.strip().split("\x1f")
            for row in out.decode('utf-8').split("\n")]
    # HACK last row is empty
    return [dict(zip(LOG_FIELDS.values(), row)) for row in rows[:-1]]


def _get_clean():
    proc = subprocess.Popen(['git', 'status', '-s'],
                            cwd=WORKING_DIR,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT)
    out, _ = proc.communicate()
    return len(out) == 0


def _get_branch():
    proc = subprocess.Popen(
        ['git', 'rev-parse', '--abbrev-ref', 'HEAD'],
        cwd=WORKING_DIR,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE)
    out, err = proc.communicate()
    # TODO proper logging
    print("Got git err output", err)
    return out.decode("utf-8").strip()


def get_info():
    return {'clean': _get_clean(), 'branch': _get_branch(), }
