import React from "react";
import { PDFViewer } from "./pdf-viewer";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

test("it renders pdf and gets a loading state", async () => {
  const pdfjs = await import("pdfjs-dist/build/pdf");
  pdfjs.GlobalWorkerOptions.workerSrc = await import(
    "pdfjs-dist/build/pdf.worker.entry"
  );

  const { container } = render(
    <TestWrapper>
      <PDFViewer
        pdf="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        width={500}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});
