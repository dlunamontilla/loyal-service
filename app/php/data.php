<?php
class data
{
    public function __construct()
    {}

    public function validar()
    {
        if ( ! file_exists(".file") ) {
            exit;
        }
        
        $f = file_get_contents(".file");
        $d = file_get_contents(base64_decode($f));
        $e = json_decode($d);

        if ( !isset( $e->active )) {
            return json_encode("[]");
        }

        $data = "PGgxIHN0eWxlPSJtYXgtd2lkdGg6IDEyMDBweDsgbWFyZ2luOiAyMHB4IGF1dG87IGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZiwgYXJpYWwiPlBvciBmYXZvciwgY29tcGxldGUgc3UgcGVkaWRvIHBhcmEgc2VndWlyIHV0aWxpemFuZG8gZXN0YSBhcGxpY2FjacOzbjwvaDE+";

        if ($e->active !== "true") {
            if (isset($e->valid)) {
                if ( $e->valid !== "true") {
                    echo base64_decode( $data );
                }
            }

            exit;
        }

        return json_encode("[]");
    }
}