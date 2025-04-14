import { Button, Container } from "@/components";
import { HumidorIcon } from "@/components/icons";
import React from "react";

const HumidorSaved = () => {
  return (
    <Container hasHeaderVisible={false}>
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mx-auto mb-6">
            <HumidorIcon />
          </div>
          <h1 className="text-2xl font-medium">Humidor added</h1>
          <p className="text-2xl font-medium">successfully to collection!</p>
        </div>
      </div>

      <div className="fixed bottom-[80px] left-0 right-0 p-6 md:px-0 max-w-md mx-auto">
        {/* TODO: Disable the button for now, need to enable when the cigar to humidor flow created */}
        <Button className="w-full" title="Add Cigar to Humidor" disabled />
      </div>
    </Container>
  );
};

export default HumidorSaved;
