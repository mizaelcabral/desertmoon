import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Home,
  Stethoscope,
  CreditCard,
  FileSignature,
  CheckCircle,
  User,
  FileUp,
  ShieldCheck,
  AlertCircle,
  FileBadge,
  Banknote,
  BriefcaseMedical,
  Leaf,
  Shield,
  Award,
  Globe,
  Phone,
  Mail,
  MapPin,
  Info
} from 'lucide-react';

const FileUpload = ({ label, id, icon: Icon, required = false, description = '', actionLink, actionLabel, fullWidthAction = false, onFileSelect }: { label: string, id: string, icon: any, required?: boolean, description?: string, actionLink?: string, actionLabel?: string, fullWidthAction?: boolean, onFileSelect?: (file: { name: string, type: string, base64: string }) => void }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onFileSelect?.({
            name: file.name,
            type: file.type,
            base64: event.target.result as string
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (actionLink) {
      window.open(actionLink, '_blank');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={fullWidthAction ? undefined : id}
          className={`text-sm font-semibold text-slate-800 flex items-center gap-2 ${fullWidthAction ? 'mb-1' : ''}`}
        >
          <Icon className="w-4 h-4 text-amber-600" />
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {actionLink && !fullWidthAction && (
          <button
            onClick={handleAction}
            className="text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-lg transition-colors flex items-center gap-1.5 border border-amber-200"
          >
            <FileSignature className="w-3 h-3" />
            {actionLabel || 'Ação'}
          </button>
        )}
      </div>
      {description && <p className="text-xs text-slate-500 mb-1">{description}</p>}
      {fullWidthAction ? (
        <button
          onClick={handleAction}
          className="flex items-center justify-center w-full px-4 py-4 border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <FileSignature className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-wide">{actionLabel || 'Assinar Online'}</span>
          </div>
        </button>
      ) : (
        <div className="relative group">
          <input
            type="file"
            id={id}
            className="hidden"
            onChange={handleFileChange}
            required={required}
          />
          <label
            htmlFor={id}
            className={`flex items-center justify-center w-full px-4 py-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${fileName
              ? 'border-amber-500 bg-amber-50/50 hover:bg-amber-50'
              : 'border-slate-300 hover:border-amber-400 hover:bg-slate-50'
              }`}
          >
            <div className="flex items-center gap-3">
              {fileName ? (
                <>
                  <CheckCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="text-sm text-amber-700 font-medium truncate max-w-[200px] sm:max-w-[300px]">{fileName}</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors shrink-0" />
                  <span className="text-sm text-slate-500 group-hover:text-amber-600 transition-colors">Clique para selecionar ou arraste o arquivo</span>
                </>
              )}
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [formData, setFormData] = useState<any>({
    patientName: '',
    respName: '',
  });
  const [files, setFiles] = useState<Record<string, { name: string, type: string, base64: string }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorHeader, setErrorHeader] = useState<string | null>(null);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzzj4ZHm6BVpOBI2osYAmjcNEYychUpqDR4i4YKFmV7hqIb32qa7lS8JKISM0cI-UYW/exec';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileSelect = (id: string, fileData: { name: string, type: string, base64: string }) => {
    setFiles(prev => ({ ...prev, [id]: fileData }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorHeader(null);

    const payload = {
      ...formData,
      files: files
    };

    try {

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script doesn't support CORS easily with POST from different domains
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        }
      });

      // Since mode is 'no-cors', we won't get a proper response, but we assume success if no error is thrown
      // Or we can try standard fetch if the user handles CORS (not easy in GAS)
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorHeader(err.message || 'Erro ao enviar documentação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Documentação Enviada!</h2>
          <p className="text-slate-600">
            Seus documentos foram recebidos com sucesso. Nossa equipe fará a análise e entrará em contato em breve.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-6 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors"
          >
            Enviar novo cadastro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-900 pb-20">
      {/* Header with Background Image */}
      <header className="relative w-full py-12 sm:pt-20 sm:pb-32 bg-white border-b border-slate-100">

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <div className="mb-8">
            <div className="inline-block bg-white p-4 rounded-2xl">
              <img
                src="https://static.wixstatic.com/media/0059f9_2d6a863718e64a989d506cc12767b9c6~mv2.jpg/v1/fill/w_200,h_142,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Captura%20de%20tela%202025-07-11%20125713_edited.jpg"
                alt="Logo da Empresa"
                className="h-28 sm:h-36 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Cadastro de Paciente – DesertMoon Brasil
          </h2>
          <p className="text-slate-600 max-w-2xl text-lg sm:text-xl mb-12">
            Preencha o formulário abaixo com seus dados e documentos para iniciar o seu tratamento com CBD de forma segura e legal no Brasil.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl w-full text-left">
            <div className="flex items-start gap-3 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
              <Shield className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 font-medium">Produção com Boas Práticas de Fabricação (GMP)</p>
            </div>
            <div className="flex items-start gap-3 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
              <Award className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 font-medium">Certificados de Análise (COAs) disponíveis para todos os lotes</p>
            </div>
            <div className="flex items-start gap-3 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
              <Globe className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 font-medium">Rastreamento completo da origem ao destino</p>
            </div>
            <div className="flex items-start gap-3 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
              <Leaf className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 font-medium">Compromisso com sustentabilidade e respeito ao meio ambiente</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:-mt-12 relative z-20">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

          <div className="p-6 sm:p-10 space-y-12">

            {/* Section 1: Documentos Pessoais */}
            <section>
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Documentos Pessoais</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="patientName" className="block text-sm font-semibold text-slate-800 mb-1">Nome Completo do Paciente *</label>
                    <input type="text" id="patientName" required value={formData.patientName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="Ex: João da Silva" />
                  </div>
                  <FileUpload
                    id="docPatient"
                    label="RG e CPF do Paciente"
                    icon={FileBadge}
                    required
                    description="Cópia legível frente e verso."
                    onFileSelect={(data) => handleFileSelect('docPatient', data)}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="respName" className="block text-sm font-semibold text-slate-800 mb-1">Nome do Responsável (se houver)</label>
                    <input type="text" id="respName" value={formData.respName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="Ex: Maria da Silva" />
                  </div>
                  <FileUpload
                    id="docResp"
                    label="RG e CPF do Responsável"
                    icon={FileBadge}
                    description="Apenas se o paciente for menor ou incapaz."
                    onFileSelect={(data) => handleFileSelect('docResp', data)}
                  />
                </div>

                <div className="md:col-span-2">
                  <FileUpload
                    id="docAddress"
                    label="Comprovante de Residência Atualizado"
                    icon={Home}
                    required
                    description="Conta de água, luz, telefone ou internet (máximo 3 meses)."
                    onFileSelect={(data) => handleFileSelect('docAddress', data)}
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Documentação Médica */}
            <section>
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Documentação Médica</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload
                  id="docPrescription"
                  label="Receita Médica Válida"
                  icon={FileText}
                  required
                  description="Receita original, carimbada e assinada pelo médico."
                  onFileSelect={(data) => handleFileSelect('docPrescription', data)}
                />
                <FileUpload
                  id="docReport"
                  label="Laudo Médico Detalhado"
                  icon={FileText}
                  required
                  description="Deve conter CID, justificativa do uso e indicação do medicamento."
                  onFileSelect={(data) => handleFileSelect('docReport', data)}
                />
              </div>
            </section>

            {/* Section 3: Comprovação Financeira */}
            <section>
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                  <Banknote className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Comprovação Financeira</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload
                  id="docBank"
                  label="Extratos Bancários"
                  icon={CreditCard}
                  required
                  description="Extratos dos últimos 3 meses de todas as contas."
                  onFileSelect={(data) => handleFileSelect('docBank', data)}
                />
                <FileUpload
                  id="docDeclaration"
                  label="Declaração de Hipossuficiência"
                  icon={FileSignature}
                  description="Documento assinado declarando incapacidade financeira."
                  actionLink="https://app.zapsign.com.br/verificar/doc/9508ca67-e761-4056-bd7c-ac69c5499bad"
                  actionLabel="Assinar Online"
                  fullWidthAction={true}
                />
              </div>
            </section>

            {/* Section 4: Documentos Administrativos */}
            <section>
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Documentos Administrativos</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload
                  id="docAnvisaAuth"
                  label="Autorização da Anvisa"
                  icon={CheckCircle}
                  required
                  description="Autorização de importação emitida pela Anvisa."
                  onFileSelect={(data) => handleFileSelect('docAnvisaAuth', data)}
                />
                <FileUpload
                  id="docAnvisaProc"
                  label="Procuração da Anvisa"
                  icon={FileSignature}
                  required
                  description="Procuração devidamente assinada pelo paciente/responsável."
                  actionLink="https://app.zapsign.com.br/verificar/doc/649b7009-b6a9-4ec7-b240-0b07c37a8249"
                  actionLabel="Assinar Online"
                  fullWidthAction={true}
                />
              </div>
            </section>

          </div>

          {/* Form Actions */}
          <div className="bg-slate-50 p-6 sm:p-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Todos os campos com * são obrigatórios.
              </p>
              {errorHeader && <p className="text-sm text-red-500 font-medium">{errorHeader}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <FileUp className="w-5 h-5" />
                  Enviar Documentação
                </>
              )}
            </button>
          </div>

        </form>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-8">
        <div className="bg-[#944BB2] text-white rounded-2xl p-8 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-500" />
                Aviso Legal
              </h4>
              <p className="text-sm leading-relaxed text-purple-100">
                Os produtos Desert Moon CBD não são comercializados em território brasileiro. As aquisições são realizadas nos Estados Unidos, e a importação ocorre exclusivamente no CPF do paciente, conforme <strong className="text-white">Resolução RDC nº 660, de 30 de março de 2022</strong>. A Desert Moon CBD Brasil presta apenas serviços administrativos e de suporte ao processo de importação.
              </p>
              <a href="https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/medicamentos/controlados/nota-tecnica-39-de-2021-produtos-cannabis" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-xs text-amber-300 hover:text-amber-200 underline underline-offset-2">
                NOTA TÉCNICA Nº 76/2025/SEI/COCIC/GPCON/DIRE5/ANVISA
              </a>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Contato</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <a href="https://wa.me/17603300145" className="hover:text-white transition-colors">+1 760 330 0145</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <a href="mailto:desertmooncbd@gmail.com" className="hover:text-white transition-colors">desertmooncbd@gmail.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>AVENIDA DAS AMERICAS, 4200, BL 1 SALA 305<br />BARRA DA TIJUCA, RIO DE JANEIRO, RJ<br />CEP 22.640-907</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-400/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-200">
            <p>© Copyright DesertMoon CBD Brasil © 2025 – Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <a href="https://www.desertmooncbdbrasil.com.br/termos-e-condi%C3%A7%C3%B5es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Termos e Condições</a>
              <a href="https://www.desertmooncbdbrasil.com.br/pol%C3%ADtica-de-privacidade" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
