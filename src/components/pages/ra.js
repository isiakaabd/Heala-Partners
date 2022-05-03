   <Grid
          item
          container
          justifyContent="space-between"
          style={{ paddingTop: "5rem" }}
        >
          {/* GENDER GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginRight: "2rem" }}
          >
            <Grid
              container
              direction="column"
              style={{ height: "100%" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">Patient Name</Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label={
                    patientData
                      ? `${patientData.firstName} ${patientData.lastName}`
                      : "no Value"
                  }
                  className={classes.infoBadge}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* DATE OF BIRTH GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginLeft: "2rem" }}
          >
            <Grid
              container
              direction="column"
              style={{ height: "100%" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">Date </Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label={dateMoment(createdAt)}
                  className={classes.infoBadge}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ paddingTop: "5rem" }}
        >
          {/* EMAIL ADDRESS GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginRight: "2rem" }}
          >
            <Grid
              container
              direction="column"
              style={{ height: "100%" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">Order ID</Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={idOrder}
                  variant="outlined"
                  className={classes.infoBadge}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* DATE OF BIRTH GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginLeft: "2rem" }}
          >
            <Grid
              container
              direction="column"
              style={{ height: "100%" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">Doctor Name</Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={
                    doctorData
                      ? `${doctorData.firstName} ${doctorData.lastName}`
                      : "No Value"
                  }
                  variant="outlined"
                  className={classes.infoBadge}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ paddingTop: "5rem" }}
        >
          {/* EMAIL ADDRESS GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginRight: "2rem" }}
          >
            <Grid
              container
              direction="column"
              style={{ height: "100%" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">Diagnostics</Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label="Chisom Sule"
                  className={classes.infoBadge}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* DATE OF BIRTH GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginLeft: "2rem" }}
          >
            <Grid
              container
              direction="column"
              style={{ height: "100%" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">Affliation</Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label={affliation ? affliation : "No Value"}
                  className={classes.infoBadge}
                />
                {/* <Chip variant="outlined" label="08123456789" className={classes.infoBadge} /> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ paddingTop: "5rem" }}
        >
          {/* EMAIL ADDRESS GRID */}

          {/* DATE OF BIRTH GRID */}

          {prescriptions && prescriptions.length > 0
            ? prescriptions.map((item, index) => (
                <Grid
                  item
                  md
                  className={classes.cardGrid}
                  style={{ minHeight: "25rem" }}
                >
                  <Grid
                    container
                    direction="column"
                    gap={2}
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="nowrap"
                  >
                    <Grid item>
                      <Typography variant="h4">
                        Prescription {index + 1}
                      </Typography>
                    </Grid>
                    <Grid item container flexWrap="nowrap" gap={3}>
                      <ul style={{ padding: "2rem", color: "#606060" }}>
                        <Typography variant="h4" gutterBottom>
                          <li>Drugs : {item.drugName}</li>
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                          <li>Dosage Quantity: {item.dosageQuantity}</li>
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                          <li>Drug Price : {item.drugPrice}</li>
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                          <li>Notes : {item.notes}</li>
                        </Typography>
                      </ul>
                    </Grid>
                  </Grid>
                </Grid>
              ))
            : null}
        </Grid>

        <Grid
          item
          container
          gap={4}
          justifyContent="center"
          alignItems="center"
          className={`${classes.gridsWrapper} ${classes.buttonsGridWrapper}`}
        >
          <Grid item xs={3}>
            <CustomButton
              variant="contained"
              title="Cancel Request"
              type={trasparentButton}
              width="100%"
              textColor={theme.palette.common.black}
              onClick={() => setOpenDisablePatient(true)}
            />
          </Grid>
          <Grid item xs={3}>
            <CustomButton
              variant="contained"
              title="Process Order"
              width="100%"
              type={darkButton}
              onClick={handleDialogOpen}
            />
          </Grid>
          <DisablePatient
            open={openProcess}
            setOpen={setOpenDisablePatient}
            title="Process Order"
            btnValue="process"
            confirmationMsg="Process Order"
            onConfirm={onConfirm2}
          />

          <DisablePatient
            open={openDisablePatient}
            setOpen={setOpenDisablePatient}
            title="Cancel Referral"
            btnValue="cancel"
            confirmationMsg="Cancel Referral"
            onConfirm={onConfirm}
          />
          <Success
            open={modal}
            handleDialogClose={handleDialogClose}
            title="SUCCESSFUL"
            btnValue="Done"
            confirmationMsg="Your order has been successful"
          />
        </Grid>
      </Grid>