use altr::{record::Records, task::Task};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn execute(candidate: String, rename: String, buf: String) -> Result<AltrResult, AltrError> {
    let mut task = Task::build(&candidate, &rename, &buf).map_err(|e| match e {
        altr::Error::CandidateCasing(_) => AltrError::CandidateCasing,
        altr::Error::RenameCasing(_) => AltrError::RenameCasing,
        _ => AltrError::Generic,
    })?;
    let mut records = task.generate_records();
    let (processed_buf, processed_records) = task.process_records(&mut records);
    Ok(AltrResult {
        records: parse_records(records),
        processed_buf,
        processed_records: parse_records(processed_records),
    })
}

#[wasm_bindgen]
pub fn validate(candidate: String, rename: String) -> Result<(), AltrError> {
    let _ = Task::build(&candidate, &rename, "").map_err(|e| match e {
        altr::Error::CandidateCasing(_) => AltrError::CandidateCasing,
        altr::Error::RenameCasing(_) => AltrError::RenameCasing,
        _ => AltrError::Generic,
    })?;

    Ok(())
}

#[wasm_bindgen]
pub enum AltrError {
    CandidateCasing,
    RenameCasing,
    Generic,
}

#[wasm_bindgen]
pub struct AltrResult {
    processed_buf: String,
    records: Vec<BasicRecord>,
    processed_records: Vec<BasicRecord>,
}

#[wasm_bindgen]
impl AltrResult {
    #[wasm_bindgen(getter = processed_buf)]
    pub fn get_processed_buf(&self) -> String {
        self.processed_buf.clone()
    }

    #[wasm_bindgen(getter = records)]
    pub fn get_records(&self) -> Vec<BasicRecord> {
        self.records.clone()
    }

    #[wasm_bindgen(getter = processed_records)]
    pub fn get_processed_records(&self) -> Vec<BasicRecord> {
        self.processed_records.clone()
    }
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct BasicRecord {
    pub pos: usize,
    pub len: usize,
}

fn parse_records(records: Records) -> Vec<BasicRecord> {
    let mut result = Vec::new();
    for (_, record) in records.iter() {
        result.push(BasicRecord {
            pos: record.pos,
            len: record.len,
        })
    }

    result
}
