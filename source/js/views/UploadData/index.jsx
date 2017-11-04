import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, HelpBlock } from 'react-bootstrap';

import Menu from 'components/Global/Menu';
import Loading from 'components/Global/Loading';

export default class UploadData extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      jenisData: '0',
    };

    this.handleJenisDataChange = this.handleJenisDataChange.bind(this);
  }


  onDropzoneDrop(accepted, rejected) {
    // acceptedFiles.forEach(file => {
      //   const reader = new FileReader();
      //   reader.onload = () => {
        //     const fileAsBinaryString = reader.result;
        //     // do whatever you want with the file content
        //   };
        //   reader.onabort = () => console.log('file reading was aborted');
        //   reader.onerror = () => console.log('file reading has failed');

        //   reader.readAsBinaryString(file);
        // });

    console.log(accepted);
    console.log('===========');
    console.log(rejected);
  }

  handleJenisDataChange(e) {
    this.setState({ jenisData: e.target.value });
  }
  render() {
    return (
      <div>
        <Menu history={ this.props.history } />
        <section className='upload-section'>
          <Grid>
            <Row>
              <Col xs={ 12 }>
                <Panel>
                  <h4>Upload Data</h4>
                  <Form>
                    <FormGroup>
                      <ControlLabel>Jenis Data</ControlLabel>
                      <FormControl componentClass='select' placeholder='Jenis Data' onChange={ this.handleJenisDataChange } value={ this.state.jenisData }>
                        <option value='0'>Data Barang</option>
                        <option value='1'>Data Supplier</option>
                      </FormControl>
                    </FormGroup>
                    {/* TODO: search best MIME-type for csv */}
                    <Dropzone accept='text/*' onDrop={ this.onDropzoneDrop } className='upload-dropzone'>
                      <h4>Drop Your File Here</h4>
                    </Dropzone>
                    <FormGroup>
                      <HelpBlock>{null}</HelpBlock>
                      <Button type='submit' block bsStyle='primary'>Upload</Button>
                    </FormGroup>
                  </Form>
                </Panel>
                <Panel />
              </Col>
            </Row>
          </Grid>
        </section>
      </div>
    );
  }
}
