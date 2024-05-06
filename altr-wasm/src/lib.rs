use altr::task::Task;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn execute(candidate: String, rename: String, buf: String) -> String {
    let mut task = Task::build(&candidate, &rename, &buf).unwrap();
    let mut records = task.generate_records().unwrap();
    let processed_buf = task.process_records(&mut records);
    processed_buf
}
